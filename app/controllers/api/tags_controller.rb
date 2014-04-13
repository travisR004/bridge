class Api::TagsController < ApplicationController
  def index
    @tags = Tag.all
    render json: @tags
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
