class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    @user.email = @user.email.downcase
    if @user.save
      login!
      render json: @user
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  def show
    @user = current_user
    render json: @user.to_json(include: [:tags])
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
    params.require(:user).permit(:email, :password, :zip_code, :summary)
  end
end
