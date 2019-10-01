Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # url external application development
    origins 'http://localhost:3001'
    resource '*', headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head],
    credentials: true
  end

  allow do
    # url external application production
    origins 'https://jdh-authentication-app-react.herokuapp.com'
    resource '*', headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head],
    credentials: true
  end
end