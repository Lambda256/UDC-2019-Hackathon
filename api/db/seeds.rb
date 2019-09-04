# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user1 = User.create!(
  email: 'test1@hunt.town',
  password: '12341234',
  name: 'Gavin Belson',
  short_description: 'Chief Executive Officer of Hooli'

)
user1.profile_picture.attach(
  io: File.open("#{Rails.root}/db/images/BertramGilfoyle-480px.jpg"),
  filename: 'BertramGilfoyle-480px.jpg'
)

user2 = User.create!(
  email: 'test2@hunt.town',
  password: '12341234',
  name: 'Bertram Gilfoyle',
  short_description: 'Senior Security Architect of Pied Piper'
)
user2.profile_picture.attach(
  io: File.open("#{Rails.root}/db/images/GavinBelson-480px.jpg"),
  filename: 'GavinBelson-480px.jpg'
)

user3 = User.create!(
  email: 'test3@hunt.town',
  password: '12341234',
  name: 'Laurie Bream',
  short_description: 'Lead Investor at Ycommute VC'
)
user3.profile_picture.attach(
  io: File.open("#{Rails.root}/db/images/LaurieBream-480px.jpg"),
  filename: 'LaurieBream-480px.jpg'
)

user1.recharge!
user2.recharge!
user3.recharge!

token1 = PrivateToken.create!(
  owner_id: user1.id,
  symbol: 'GB',
  initial_price: 100.0,
  charity: 'alzheimers_association',
  offers: 'Gavin Belson offers a guidance to grow a multi-million startup from a ground. He can also help you to connect with his network in relation to your startup venture.',
  description: 'Gavin Belson is Co-Founder & CEO of Hooli — the first of its kind corporate IT infra solution. He is passionate about artificial intelligence, robots, space, cars, and engines—pretty much anything you might find in an episode of Star Trek. In just three years, Hooli grew to $1.5 billion in volume of transactions processed.',
  category: 'business',
  social_links: {
    linked_in: 'https://www.linkedin.com/in/sydneyitguy',
    instagram: 'https://www.instagram.com/eat.drink.lover'
  }
)
token1.images.attach([{
  io: File.open("#{Rails.root}/db/images/BertramGilfoyle-1600px-1.jpg"),
  filename: 'BertramGilfoyle-1600px-1.jpg'
}, {
  io: File.open("#{Rails.root}/db/images/BertramGilfoyle-1600px-2.jpg"),
  filename: 'BertramGilfoyle-1600px-2.jpg'
}, {
  io: File.open("#{Rails.root}/db/images/BertramGilfoyle-1600px-3.jpg"),
  filename: 'BertramGilfoyle-1600px-3.jpg'
}])

token2 = PrivateToken.create!(
  owner_id: user2.id,
  symbol: 'BG',
  initial_price: 200.0,
  charity: 'red_cross',
  offers: 'Bertram Gilfoyle can give a wide range of advices in the area of software development, security and infrastructure that can grow to be a unicorn service.',
  description: 'Bertram Gilfoyle is an entrepreneur, software engineer, and diversity advocate. He spent five years at Pied Piper as an engineer and tech lead and was an early engineer at Koogle prior to that. He is a co-founder of Project MindAI, a non-profit working with tech startups on diversity and IT career, and #DoNotDisturb, a movement working with VC firms to establish and publish anti-harassment policies; and an investment scout and advisor for several Bay Area VC firms. In his latest venture he is CEO of Bricks Second, with a mission to solve online harassment and abuse.',
  category: 'technology',
  social_links: {
    linked_in: 'https://www.linkedin.com/in/sungwoopark95',
    instagram: 'https://www.instagram.com/s.ggoma'
  }
)
token2.images.attach([{
  io: File.open("#{Rails.root}/db/images/GavinBelson-1600px-1.jpg"),
  filename: 'GavinBelson-1600px-1.jpg'
}, {
  io: File.open("#{Rails.root}/db/images/GavinBelson-1600px-2.jpg"),
  filename: 'GavinBelson-1600px-2.jpg'
}, {
  io: File.open("#{Rails.root}/db/images/GavinBelson-1600px-3.jpg"),
  filename: 'GavinBelson-1600px-3.jpg'
}])

token3 = PrivateToken.create!(
  owner_id: user3.id,
  symbol: 'LB',
  initial_price: 300.0,
  charity: 'the_nature_conservancy',
  offers: 'Laurie Bream will guide you how to connect with the top VCs in Silicon Valley',
  description: 'Laurie Bream is an investor at Ycommute VC, a pre-seed and seed stage venture capital fund. She also worked at Founder Cognitive as a Founder Partner, served as Chairman of Atmosy and was the co-founder of Photkr. Ycommute VC invests in scalable social systems, brands that embody cultural movements, and founders who recognize the opportunity in the rising power and affluence of women. Laurie sits on the boards of Public Keys, the Sussana Institute and McDonation.',
  category: 'business',
  social_links: {
    linked_in: 'https://www.linkedin.com/in/sungwoopark95',
    instagram: 'https://www.instagram.com/s.ggoma'
  }
)
token3.images.attach([{
  io: File.open("#{Rails.root}/db/images/LaurieBream-1600px-1.jpg"),
  filename: 'LaurieBream-1600px-1.jpg'
}, {
  io: File.open("#{Rails.root}/db/images/LaurieBream-1600px-2.jpg"),
  filename: 'LaurieBream-1600px-2.jpg'
}, {
  io: File.open("#{Rails.root}/db/images/LaurieBream-1600px-3.jpg"),
  filename: 'LaurieBream-1600px-3.jpg'
}])

user1.donate_and_buy!(token1)
user1.donate_and_buy!(token2)
user1.donate_and_buy!(token3)
user2.donate_and_buy!(token1)
user2.donate_and_buy!(token3)
user3.donate_and_buy!(token2)

RedeemRequest.create!(
  private_token_id: token3.id,
  owner_id: token3.owner_id,
  sender_id: user1.id,
  amount: 1
)
