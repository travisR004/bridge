# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  first_name      :string(255)
#  last_name       :string(255)
#  interest        :text
#  created_at      :datetime
#  updated_at      :datetime
#  session_token   :string(255)
#  password_digest :string(255)
#  email           :string(255)
#  summary         :text
#  location        :string(255)
#

class User < ActiveRecord::Base
  attr_reader :password
  validates :email, presence: true
  validates :email, uniqueness: true
  validates :password, presence: true, on: :create
  validates :password, length: {minimum: 6, allow_nil: true}
  before_validation :ensure_session_token
  
  has_many :user_join_tags
  has_many :tags, through: :user_join_tags
  
  def password=(pt)
    @password = pt
    self.password_digest = BCrypt::Password.create(pt)
  end

  def is_password?(pt)
    BCrypt::Password.new(self.password_digest).is_password?(pt)
  end

  def self.find_by_credentials(params)
    user = User.find_by(email: params[:email])
    user.try(:is_password?, params[:password]) ? user :nil
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end

  private
  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end
end
