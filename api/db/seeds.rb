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

user4 = User.create!(
  email: 'test4@hunt.town',
  password: '12341234',
  name: 'Emilee Jennings',
  short_description: 'Radio Presenter at KBS'
)
user4.profile_picture.attach(
  io: File.open("#{Rails.root}/db/images/EmileeJennings-480px.jpg"),
  filename: 'EmileeJennings-480px.jpg'
)

user5 = User.create!(
  email: 'test5@hunt.town',
  password: '12341234',
  name: 'Sung Woo Park',
  short_description: 'Co-founder, CMO and Developer at Sketchware'
)
user5.profile_picture.attach(
  io: File.open("#{Rails.root}/db/images/SungWooPark-480px.jpg"),
  filename: 'SungWooPark-480px.jpg'
)

user6 = User.create!(
  email: 'test6@hunt.town',
  password: '12341234',
  name: 'Mathew Jimerstok',
  short_description: 'Partner & Director at KGSI Ventures'
)
user6.profile_picture.attach(
  io: File.open("#{Rails.root}/db/images/MathewJimerstok-480px.jpg"),
  filename: 'MathewJimerstok-480px.jpg'
)

user1.recharge!(10000)
user2.recharge!(50000)
user3.recharge!(10000)
user4.recharge!(5000)
user5.recharge!(5000)
user6.recharge!(5000)

token1 = PrivateToken.create!(
  owner_id: user1.id,
  symbol: 'GAVIN',
  initial_price: 100.0,
  charity: 'wwf',
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
  symbol: 'BERT',
  initial_price: 200.0,
  charity: 'unhcr',
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
  symbol: 'LAURIE',
  initial_price: 300.0,
  charity: 'national_trust',
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

token4 = PrivateToken.create!(
  owner_id: user4.id,
  symbol: 'EMILEE',
  initial_price: 100.0,
  charity: 'wwf',
  offers: 'Emilee Jennings offers guidance on building a career as a radio announcer',
  description: 'Emilee Jennings is a journalist from Sligo, Ireland. She returned home after 5 years working in the print and broadcasting industry in Seoul, Korea. She now works full-time with StoryLab, a Content and PR Agency in Ireland. Emilee has also been broadcasting on the KBS (Korean Broadcasting System, the biggest national broadcasting company in South Korea) for over 40 years and has been recognised as one of the most favorite presenters voted from the listeners.',
  category: 'journalism',
  social_links: {
    linked_in: 'https://www.linkedin.com/in/sungwoopark95',
    instagram: 'https://www.instagram.com/s.ggoma'
  }
)
token4.images.attach([{
  io: File.open("#{Rails.root}/db/images/EmileeJennings-1600px-1.jpg"),
  filename: 'EmileeJennings-1600px-1.jpg'
}, {
  io: File.open("#{Rails.root}/db/images/EmileeJennings-1600px-2.jpg"),
  filename: 'EmileeJennings-1600px-2.jpg'
}, {
  io: File.open("#{Rails.root}/db/images/EmileeJennings-1600px-3.jpg"),
  filename: 'EmileeJennings-1600px-3.jpg'
}])

token5 = PrivateToken.create!(
  owner_id: user5.id,
  symbol: 'SWP',
  initial_price: 30.0,
  charity: 'unhcr',
  offers: 'Sung Woo Park can help you to design top notch front-end user experience',
  description: 'Sung Woo Park is a renowned front-end maniac who loves to prototype eye-catching mobile app User Interfaces. He co-founded Sketchware, like Wordpress for mobile apps, acquired over 2,000,000 installs over the year analyzing user behavior flow and respectively remodeling UI/UX. His state-of-the-art front-end technic has brought 24,900% install growth (from 4,000 to 1,000,000) over the year.',
  category: 'technology',
  social_links: {
    linked_in: 'https://www.linkedin.com/in/sungwoopark95',
    instagram: 'https://www.instagram.com/s.ggoma'
  }
)
token5.images.attach([{
  io: File.open("#{Rails.root}/db/images/SungWooPark-1600px-1.jpg"),
  filename: 'SungWooPark-1600px-1.jpg'
}, {
  io: File.open("#{Rails.root}/db/images/SungWooPark-1600px-2.jpg"),
  filename: 'SungWooPark-1600px-2.jpg'
}])

token6 = PrivateToken.create!(
  owner_id: user6.id,
  symbol: 'MATHEW',
  initial_price: 10.0,
  charity: 'national_trust',
  offers: 'Mathew Jumerstok can introduce the top startup founders that he mentored',
  description: 'Mathew Jimerstok is Partner & Director at KGSI Ventures, the venture incubation unit of the Huston Consulting Group. He is based in Singapore and part of the leadership team of HCGDV’s new South East Asia Incubation Center. At HCGDV he is dedicated to inventing, building, investing in and launching category-changing businesses at start-up speed for the world’s most influential corporates. His portfolio includes ventures such as OVO, Boost, HeyCar, Coup, QantasAssure, Formation, MachineMax or AutoGravity.',
  category: 'business',
  social_links: {
    linked_in: 'https://www.linkedin.com/in/sungwoopark95',
    instagram: 'https://www.instagram.com/s.ggoma'
  }
)
token6.images.attach([{
  io: File.open("#{Rails.root}/db/images/MathewJimerstok-1600px-1.jpg"),
  filename: 'MathewJimerstok-1600px-1.jpg'
}, {
  io: File.open("#{Rails.root}/db/images/MathewJimerstok-1600px-2.jpg"),
  filename: 'MathewJimerstok-1600px-2.jpg'
}])

10.times {
  user1.donate_and_buy!(token1)
  user1.donate_and_buy!(token2)
  user1.donate_and_buy!(token3)
  user1.donate_and_buy!(token6)
}
30.times {
  user2.donate_and_buy!(token1)
  user1.donate_and_buy!(token5)
}
10.times {
  user2.donate_and_buy!(token3)
  user3.donate_and_buy!(token1)
  user1.donate_and_buy!(token4)
}

token1 = PrivateToken.find(1)
token2 = PrivateToken.find(2)
token3 = PrivateToken.find(3)
token4 = PrivateToken.find(4)
token5 = PrivateToken.find(5)
token6 = PrivateToken.find(6)
user1 = User.find(1)
user2 = User.find(2)
user3 = User.find(3)
user4 = User.find(4)
user5 = User.find(5)
user6 = User.find(6)

# Pending request
RedeemRequest.create!(private_token_id: token2.id, owner_id: token2.owner_id, sender_id: user1.id, amount: 1)
# Finished request
rr = RedeemRequest.create!( private_token_id: token1.id, owner_id: token1.owner_id, sender_id: user2.id, amount: 1)
rr.sign_by_owner!
rr.sign_by_sender!

Order.create!(private_token_id: token1.id, maker_id: user2.id, price: token1.current_price * 0.99, amount: 3)
Order.create!(private_token_id: token1.id, maker_id: user2.id, price: token1.current_price * 0.95, amount: 2)
Order.create!(private_token_id: token1.id, maker_id: user2.id, price: token1.current_price * 0.82, amount: 1.4)
Order.create!(private_token_id: token1.id, maker_id: user2.id, price: token1.current_price * 0.89, amount: 1.5)
Order.create!(private_token_id: token1.id, maker_id: user2.id, price: token1.current_price * 0.87, amount: 1.2)
Order.create!(private_token_id: token1.id, maker_id: user2.id, price: token1.current_price * 0.85, amount: 0.5)

last_price = token1.current_price * 0.8
time = 1000.minutes.ago
50.times {
  last_price += last_price * [-1, 1].sample * (rand / 10.0) # +/- 10%
  last_price = token1.current_price * 0.9 if last_price >= token1.current_price
  time += (1000 / 50).minutes
  Order.create!(private_token_id: token1.id, maker_id: user1.id, price: last_price, amount: 1.0, created_at: time, updated_at: time).take!(user1.id)
}
