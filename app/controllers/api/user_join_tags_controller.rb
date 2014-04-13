class Api::UserJoinTagsController < ApplicationController
  def create
    @user_join_tag = UserJoinTag.new(user_join_tag_params)
    @user_join_tag.user_id = current_user.id
    if @user_join_tag.save
      render json: @user_join_tag
    else
      render json: @user_join_tag.errors.full_messages, status: 402
    end
  end
  
  private
  def user_join_tag_params
    params.require(:user_join_tag).permit(:tag_id)
  end
end
