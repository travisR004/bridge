class Api::ProjectsController < ApplicationController
  before_action :require_login!, only: [:create]
  def index
    @projects = current_user.projects
    render json: @projects
  end
  
  def show
    @project = current_user.projects.find(params[:id])
    render 'projects/show'
  end
  
  def create
    @project = current_user.projects.new(project_params)
    if @project.save
      params[:image][:photo].each do |photo|
        image = Image.new(project_id: @project.id)
        image.photo = photo
        image.save!
      end
      render json: @project
    else
      render json: @project.errors.full_messages, status: 422
    end
    
  end
  
  private
  def project_params
    params.require(:project).permit(:title, :description, :public_description, :status)
  end
end
