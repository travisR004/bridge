class Api::ProjectsController < ApplicationController
  def index
    @projects = current_user.projects
    render json: @projects
  end
  
  def create
    @project = current_user.projects.new(project_params)
    if @project.save
      render json: @project
    else
      render json: @project.errors.full_messages
    end
  end
  
  private
  def project_params
    params.require(:project).permit(:title, :description, :public_description)
  end
end
