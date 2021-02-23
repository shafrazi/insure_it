class Renewal < ApplicationRecord
  after_create :set_policy_expiry
  after_destroy :set_last_renewal_expiry

  belongs_to :insurance_policy
  validates :policy_no, :start_date, :expiry_date, :insurance_policy_id, :insurer, presence: true

  def set_policy_expiry
    self.insurance_policy.current_expiry = self.expiry_date
    self.insurance_policy.save
  end

  def set_last_renewal_expiry
    insurance_policy = self.insurance_policy
    if insurance_policy.renewals.any?
      insurance_policy.current_expiry = insurance_policy.renewals.last.expiry_date
      insurance_policy.save
    end
  end
end
