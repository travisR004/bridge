class SessionsController < ApplicationController
  def new
  end
  
  def create
    user_params[:email] = user_params[:email].downcase
    @user = User.find_by_credentials(user_params)
    if @user
      login!
      render json: @user
    else
      render json: ["Invalid Credentials"], status: 422
    end
  end
  
  def destroy
    @user = current_user
    logout!
    render json: @user
  end
  
  private
  def user_params
    params.require(:user).permit(:email, :password)
  end
end
