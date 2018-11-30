Rails.application.routes.draw do
  resources :users, only: [:new, :create, :show]

  root 'users#new'

  get 'nick_validator/:nick', to: 'users#nick_name_validator'
  post 'email_validator', to: 'users#email_validator'
end
