class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    @user.email = @user.email.downcase
    if @user.save
      login!
      UserMailer.welcome_email(@user).deliver
      render json: @user
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  def show
    @user = current_user
    render json: @user.to_json(include: [:passions, :skills])
  end
  
  def update
    @user = current_user
    if @user.update_attributes(user_params)
      render json: @user
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  private
  def user_params
    params.require(:user).permit(:email, :password, :location, :summary)
  end
end
