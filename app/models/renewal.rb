class Renewal < ApplicationRecord
  after_create :set_policy_details
  after_destroy :set_last_renewal_details

  belongs_to :insurance_policy
  validates :policy_no, :start_date, :expiry_date, :insurance_policy_id, :insurer, presence: true

  def set_policy_details
    insurance_policy = self.insurance_policy
    insurance_policy.current_expiry = self.expiry_date
    insurance_policy.policy_no = self.policy_no
    insurance_policy.insurer = self.insurer
    insurance_policy.save!
  end

  def set_last_renewal_details
    insurance_policy = self.insurance_policy
    if insurance_policy.renewals.any?
      last_renewal = insurance_policy.renewals.last
      insurance_policy.current_expiry = last_renewal.expiry_date
      insurance_policy.policy_no = last_renewal.policy_no
      insurance_policy.insurer = last_renewal.insurer
      insurance_policy.save!
    end
  end
end
