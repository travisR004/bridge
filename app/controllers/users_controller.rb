class UsersController < ApplicationController
  def new
  end
  
  def create
    @user = User.new(user_params)
    @user.email = @user.email.downcase
    if @user.save
      login!
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render 'new'
    end
  end
  
  private
  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :zip_code, :password, :interest)
  end
end
