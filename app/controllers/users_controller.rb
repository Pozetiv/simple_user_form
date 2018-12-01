class UsersController < ApplicationController
  def new
  	@user = User.new 
  end

  def create
  	@user = User.new(users_params)
  	if @user.save 
  		redirect_to @user
  	else
  		render :new
  	end
  end

  def show
  	@user = User.find(params[:id])
  end

  def nick_name_validator
     if User.find_by_nick(params[:nick])
      render json: { valid: false } 
    else 
      render json: { valid: true }
    end
  end

  def email_validator 
    if User.find_by_email(params[:user][:email])
      render json: { valid: false }
    else
      render json: { valid: true }
    end
  end

  private 

  def users_params
  	params.require(:user).permit(:nick, :name, :surname, :password, :email)
  end
end
