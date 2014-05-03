class UserMailer < ActionMailer::Base
  default from: "travisR004@gmail.com"
  
  def welcome_email(user)
    @user = user
    @url = 'http://example.com/login'
    mail(to: user.email, subject: "Welcome to Bridge - Start Connecting")
  end
end
