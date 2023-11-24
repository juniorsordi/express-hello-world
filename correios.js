const TrackingCorreios = require('tracking-correios');

TrackingCorreios.track( 'DU897123996BR' )
    .then(console.log)