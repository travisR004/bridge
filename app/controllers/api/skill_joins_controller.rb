class Api::SkillJoinsController < ApplicationController
  def create
    @skill_join = SkillJoin.new(user_join_tag_params)
    @skill_join.user_id = current_user.id
    if @skill_join.save
      render json: @skill_join
    else
      render json: @skill_join.errors.full_messages, status: 402
    end
  end
  
  private
  def user_join_tag_params
    params.require(:skill_join).permit(:tag_id)
  end
end
