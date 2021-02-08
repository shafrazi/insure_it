class CreateInsurancePolicies < ActiveRecord::Migration[6.1]
  def change
    create_table :insurance_policies do |t|
      t.string :policy_no
      t.string :insurer
      t.decimal :value
      t.string :insurance_type
      t.date :current_expiry
      t.string :asset
      t.references :customer, null: false, foreign_key: true

      t.timestamps
    end
  end
end
