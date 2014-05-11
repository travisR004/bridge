class Api::ProjectsController < ApplicationController
  before_action :require_login!, only: [:create]
  def index
    if params[:explore]
      @projects = Project.all.includes(:images)
      render 'projects/index'
    else
      @projects = current_user.projects
      render json: @projects
    end
  end
  
  def show
    @project = current_user.projects.find(params[:id])
    render 'projects/show'
  end
  
  def create
    @project = current_user.projects.new(project_params)
    if @project.save
      if params[:image][:photo]
        params[:image][:photo].each do |photo|
          image = Image.new(project_id: @project.id)
          image.photo = photo
          image.save!
        end
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
