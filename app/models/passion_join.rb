# == Schema Information
#
# Table name: passion_joins
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  tag_id     :integer
#  created_at :datetime
#  updated_at :datetime
#

class PassionJoin < ActiveRecord::Base
  belongs_to :tag
  belongs_to :user
end
