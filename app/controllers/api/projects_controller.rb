class Api::ProjectsController < ApplicationController
  def index
    @projects = current_user.projects
    render json: @projects
  end
  
  def create
    @project = current_user.projects.new(project_params)
    if @project.save
      params[:project][:image].each do |photo|
        fail
        image = new Image(project_id: @project.id)
        image.photo = photo
        image.save
      end
      
      render json: @project
    else
      render json: @project.errors.full_messages
    end
    
  end
  
  private
  def project_params
    params.require(:project).permit(:title, :description, :public_description, :status)
  end
end
