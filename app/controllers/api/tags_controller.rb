class Api::TagsController < ApplicationController
  before_action :require_login!
  
  def index
    if params[:tag_name]
      @tag = Tag.find_by(name: params[:tag_name])
      render json: @tag.to_json(include: :children)
    else
      @tags = Tag.where("parent_id IS NULL")
      render json: @tags
    end
  end
  
  def create
    @tag = Tag.new(tag_params)
    if @tag.save
      render json: @tag
    else
      @tag = Tag.find_by(name: tag_params[:name])
      render json: @tag, status: :unprocessable_entity
    end
  end
  
  private
  def tag_params
    params.require(:tag).permit(:name)
  end
end
