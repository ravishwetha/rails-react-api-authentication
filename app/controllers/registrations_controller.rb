class RegistrationsController < ApplicationController
  def create
    logger.info("=ВХОД В ФУНКЦИЮ===============================================")
    logger.info(params['user'])
    logger.info("==============================================================")
    
    user = User.create!(
      email: params['user']['email'],
      password: params['user']['password'],
      password_confirmation: params['user']['password_confirmation']
    )

    if user
      session[:user_id] = user.id
      render json: {
        status: :created,
        user: user
      }
    else
      render json: { status: 500 }
    end
  end
end