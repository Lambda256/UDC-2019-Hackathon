require 'faraday'

module Luniverse
  TEAM_WALLET = '0xec83e20f5a5e431274f7d8514fdb00bd912a6aa9'
  MAIN_TOKEN = 'TIME'
  SIDE_TOKEN = 'HOUR'
  TX_API = 'https://api.luniverse.net/tx/v1.0'

  def self.recharge!(to, amount)
    result = self.fetch_json!(:post, "#{TX_API}/transactions/recharge", {
      inputs: {
        receiverAddress: to,
        valueAmount: (amount * 10**18).to_i
      }
    })

    sleep(1)
    self.wait_till_succeed!(result['txId'])
  end

  def self.transfer!(from, to, amount)
    result = self.fetch_json!(:post, "#{TX_API}/transactions/transfer", {
      from: from,
      inputs: {
        receiverAddress: to,
        valueAmount: (amount * 10**18).to_i
      }
    })

    sleep(1)
    self.wait_till_succeed!(result['txId'])
  end

  def self.create_or_retrieve_wallet!(user_id)
    result = self.fetch_json!(:post, "#{TX_API}/wallets", {
      walletType: 'LUNIVERSE',
      userKey: user_id
    })

    result['address']
  end

  def self.get_wallet_balance!(address)
    result = self.fetch_json!(:get, "#{TX_API}/wallets/#{address}/#{MAIN_TOKEN}/#{SIDE_TOKEN}/balance")

    result['balance'].to_d / 10**18
  end

  def self.get_transactions!(filter_address)
    histories = self.fetch_json!(:get, "#{TX_API}/histories")['histories']['items']

    # HACK: Use raw log data
    # 1. On response, `receiverAddress` is a contract address instead of actual receiver address
    # 2. `Bulk /receipts` API has parsed objects of user input on `logs` data,
    #    but not callable bulk without txHash array parameter (I guess this is a wrong API design)
    # 3. `Bulk /histories` API can call without txId array parameter,
    #    but results only contains a raw log (not parsed), so we just use the raw log like below
    filter_address.gsub!(/\A0x/,'')
    tx_hashes = histories.map do |h|
      if h['txReceipt']['logsRaw'].first.try(:[], 'data').try(:include?, filter_address)
        h['txHash']
      else
        nil
      end
    end.compact

    receipts = self.fetch_json!(:get, "#{TX_API}/receipts", { txHashes: tx_hashes })['receipts']['items']
    receipts.map do |r|
      r.slice('txId', 'txHash', 'txStatus').merge(r['txReceipt']['logs'].first)
    end
  end

  def self.get_receipt!(tx_hash)
    self.fetch_json!(:get, "#{TX_API}/receipts/#{tx_hash}")
  end

  private
    def self.fetch_json!(request_method, url, data = nil)
      con = Faraday.new
      response = con.send(request_method) do |req|
        req.url url
        req.headers = {
          'Content-Type' => 'application/json',
          'Authorization' => ENV['LUNIVERSE_DAPP_KEY']
        }
        req.body = data.try(:to_json)
      end
      result = JSON.parse(response.body)

      raise "API failed: #{url} - #{result}" unless result['result']

      result['data']
    end

    def self.wait_till_succeed!(tx_id)
      1.upto(5) do |n|
        result = self.fetch_json!(:get, "#{TX_API}/histories/#{tx_id}")
        tx_status = result['history']['txStatus']

        case tx_status
        when 'WAIT', 'SENT'
          puts "Status: #{tx_status}, wait..."
          sleep(2)
          next
        when 'SUCCEED'
          return result['history']
        else
          raise "TX #{tx_status}: #{result}"
        end
      end

      raise "TX timeout: #{tx_id}"
    end
end
