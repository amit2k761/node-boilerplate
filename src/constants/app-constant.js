export default {
  http_codes: {
    success: 200,
    bad_request: 400,
    forbidden: 403,
    not_found: 404,
    internal_server_error: 500,
    created: 201,
    already_exists: 409,
    unauthenticated: 401,
    no_content:204
  },
  messsages: {
    resources: {
      role: {
        success: {},
        error: {
          role_not_created: 'Role couldnt be created',
          role_not_available: 'Role not available'
        },
        validation: {
          name_required: 'Role name is required',
          description_required: 'Role description is required',
          type_required: 'Role type is required'
        }
      },
      default: {
        success: {},
        error: {
          default_not_created: 'Unable to create',
          default_not_available: 'Not available'
        },
        validation: {
          name_required: 'Name is required',
          description_required: 'Description is required',
          type_required: 'Type is required'
        }
      },
      user: {
        success: {},
        error: {
          incorrect_password: 'Email or password is invalid',
          email_not_found: 'Please signup.',
          no_register_action: 'Register action is currently disabled.'
        },
        validation: {
          email_required: 'User email is required',
          password_required: 'User password is required',
          provider_required: 'Provider is required',
          role_required: 'Role is required.',
          email_already_taken: 'This email is already taken.',
          pubg_in_game_required: 'Pubg in game is required'
        }
      }
    },
    server: {
      success: {
        server_started: 'Server started on',
        globals_attached: 'Globals attached successfully.',
        pre_server_connections_setup:
          'Pre server connections setup done successfully',
        mongodb_connected: 'MongoDB connected successfully',
        sql_connected: 'sql connected successfully',
        env_validated: 'Environment variables validated successfully',
        redis_connected: 'Redis connected successfully'
      },
      error: {
        global_attaching_error: 'Error attaching globals',
        pre_server_connections_failed: 'Pre server connections setup failed',
        server_failed: 'Error starting server',
        mongodb_connection_failed: 'MongoDb connection failed',
        sql_connection_failed: 'sql connection failed',
        env_validation_failed: 'Environment variables variable failed',
        all_db_connections_failed: 'Error connecting databases',
        redis_connection_failed: 'Redis connection failed'
      }
    }
  },
  url: {},
  notifications: {
    welcome_title: 'Royale Arena',
    welcome_text: 'Welcome to Royale Arena'
  },
  properties:{
    skip:0,
    limit:10
  }
};
