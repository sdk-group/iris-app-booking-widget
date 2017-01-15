'use strict';

(function () {

  (function () {
    'use strict';

    var default_settings = [{
      name: 'API',
      items: {
        api_server: {
          element: 'input',
          label: 'Сервер',
          default: window.location.hostname
        },
        api_port: {
          element: 'input',
          label: 'Порт',
          default: '9000'
        }
      }
    }, {
      name: 'Дата-сервер',
      items: {
        data_server: {
          element: 'input',
          label: 'Сервер',
          default: window.location.hostname
        },
        data_port: {
          element: 'input',
          label: 'Порт',
          default: window.location.port
        }
      }
    }, {
      name: 'АРМ',
      items: {
        operator_arm_id: {
          element: 'input',
          label: 'ID рабочего места оператора'
        }
      }
    }];

    var workstation_type = 'booking-widget';

    Polymer({
      is: 'booking-widget-api',
      ready: function ready() {
        var _this = this;

        window.locker = this.$.locker;
        console.log(_.capitalize(workstation_type) + ' API ready');
        var User = IRIS.User;
        var arm_settings = new IRIS.settings();
        arm_settings.addDesc(default_settings);
        //@NOTE: could we put something more useful than localhost
        if (arm_settings.getDefaults('data_server') == 'localhost' && arm_settings.getItem('api_server')) arm_settings.setDefaults('data_server', arm_settings.getItem('api_server'));

        this.$.api.expose('settings', arm_settings);

        var arm_operator = new User(workstation_type);
        this.$.api.expose('user', arm_operator);

        var id = arm_settings.getItem('operator_arm_id');

        if (!id) {
          return;
        }

        var params = {
          parent: id,
          satellite_type: 'booking-widget'
        };

        this.$.api.boot = function () {
          return page.current == "/settings" ? false : _this.connect(params);
        };
      },
      connect: function connect(params) {
        var _this2 = this;

        this.$.locker.lock();

        var login = 'booking-widget';
        var password = '1';

        return this.$.api.require('user').login(login, password, params).then(function () {
          console.log('connection complete');
          _this2.$.locker.unlock();
          return true;
        }).catch(function (e) {
          _this2.$.locker.unlock();

          console.log('connection error', e);
          setTimeout(function () {
            console.log('reconnection in 2s');
            _this2.connect(params);
          }, 2000);
          throw e;
        });
      }
    });
  })();
})();