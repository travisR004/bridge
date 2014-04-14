class SkillJoin < ActiveRecord::Base
  belongs_to :user
  belongs_to :tag
end
