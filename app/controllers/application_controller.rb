class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  
  helper_method :current_user

  def current_user
    session_token = session[:session_token]
    return nil if session_token.nil?
    User.find_by_session_token(session_token)
  end

  def login!
    @user.reset_session_token!
    session[:session_token] = @user.session_token
  end
  
  def require_login!
    redirect_to root_url unless current_user
  end
  
  def logout!
    current_user.reset_session_token!
    session[:session_token] = nil
  end
  
  def require_access
    redirect_to static_pages_not_home_url unless session[:access_token] == "4vuZyBmDvbSi0JV54RuVug"
  end
  
end
