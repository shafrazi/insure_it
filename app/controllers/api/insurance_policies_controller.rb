class Api::InsurancePoliciesController < ApplicationController
  before_action :set_insurance_policy, only: [:show, :update]
  protect_from_forgery with: :null_session
  def index
    @insurance_policies = InsurancePolicy.all
    
    render json: InsurancePolicySerializer.new(@insurance_policies, {fields: {insurance_policy: [:customer_name, :policy_no, :insurer, :value, :insurance_type, :current_expiry, :asset]}}).serializable_hash
  end

  def create
    @insurance_policy = InsurancePolicy.new(insurance_policy_params)
    if @insurance_policy.save
      render json: @insurance_policy
    else
      render json: {error: @insurance_policy.errors.messages}, status: 422
    end
  end

  def show
    render json: InsurancePolicySerializer.new(@insurance_policy).serializable_hash
  end

  def update
    if @insurance_policy.update(insurance_policy_params)
      render json: InsurancePolicySerializer.new(@insurance_policy).serializable_hash
    else
      render json: {error: @insurance_policy.errors.messages}, status: 422
    end
  end

  def destroy
    @insurance_policy = InsurancePolicy.find_by(id: params[:id])
    if @insurance_policy
      @insurance_policy.destroy
      head :no_content
    else
      render json: {error: "Record not found"}, status: 400
    end
  end

  private

  def set_insurance_policy
    @insurance_policy = InsurancePolicy.find(params[:id])
  end

  def insurance_policy_params
    params.require(:insurance_policy).permit(:policy_no, :insurer, :value, :insurance_type, :current_expiry, :asset, :customer_id)
  end
end
