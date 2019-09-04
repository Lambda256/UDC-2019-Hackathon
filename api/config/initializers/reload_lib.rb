if Rails.env.development?
  lib_reloader = ActiveSupport::FileUpdateChecker.new(Dir["lib/**/*"]) do
    Rails.application.reload_routes! # or do something better here

    Object.try(:remove_const, :Luniverse)
    load "#{Rails.root}/lib/luniverse.rb"

    puts "Libraries Reloaded!"
  end

  # For Rails 5.1+
  ActiveSupport::Reloader.to_prepare do
    lib_reloader.execute_if_updated
  end
end