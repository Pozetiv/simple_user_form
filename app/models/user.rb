class User < ApplicationRecord
	has_secure_password
	
  validates :nick, presence: true, uniqueness: true, format: { with: /\A[a-zA-z]+*[a-zA-Z0-9]*\z/ }
  validates :email, presence: true, uniqueness: true, format: { with: /\A[a-z\d]+[0-9a-z\d]*@[a-z\d]+\.[a-z]+\z/ }
  validates :password,  presence: true, length: { minimum: 5 }
  validates :surname, :name, presence: true, format: { with: /\A[а-яА-Я]+*\z/ }
end
