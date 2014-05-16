class StaticPagesController < ApplicationController
  before_action :require_access, only: [:home]
  
  def home
  end
  
  def not_home
  end
  
  def allow_access
    if params[:password] == "Le@nSupp1y"
      session[:access_token] = "4vuZyBmDvbSi0JV54RuVug"
      redirect_to root_url
    else
      redirect_to static_pages_not_home_url
    end
  end
  
end
