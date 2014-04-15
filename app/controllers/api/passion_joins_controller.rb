class Api::PassionJoinsController < ApplicationController
  def create
    @passion_join = PassionJoin.new(user_join_tag_params)
    @passion_join.user_id = current_user.id
    if @passion_join.save
      render json: @passion_join
    else
      render json: @passion_join.errors.full_messages, status: 422
    end
  end
  
  private
  def passion_join_params
    params.require(:passion_join).permit(:tag_id)
  end
end
