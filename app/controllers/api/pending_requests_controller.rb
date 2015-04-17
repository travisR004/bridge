class Api::PendingRequestsController < ApplicationController
  
  def index
    @pending_requests = current_user.in_pending_requests
    @pending_requests += current_user.out_pending_requests
    render "pending_requests/index"
  end
  
  def update
  end
end
