class SessionsController < ApplicationController
  def new
  end
  
  def create
    user_params[:email] = user_params[:email].downcase
    @user = User.find_by_credentials(user_params)
    if @user
      login!
      redirect_to root_url
    else
      flash.now[:errors] = ["Invalid Credentials"]
      render 'new'
    end
  end
  
  def destroy
    user = current_user

    if user.nil?
      redirect_to new_session_url
      return
    end

    session[:session_token] = nil
    user.session_token = nil
    user.save!

    redirect_to new_session_url
  end
  
  private
  def user_params
    params.require(:user).permit(:email, :password)
  end
end
