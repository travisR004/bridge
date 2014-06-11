class Api::PartnershipsController < ApplicationController
  
  def index
    @partners = current_user.partners
    render json: @partners
  end
    
end
