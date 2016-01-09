import DS from 'ember-data';

const ErrorModel = DS.Model.extend({
  location: DS.attr('string'),
  description: DS.attr('string'),
  date: DS.attr('string'),
  status: DS.attr('string'),
});

ErrorModel.reopenClass({
    FIXTURES: [
        {
            id: 1,
            date: '2021.12.12',
            location: 'pc1',
            description: 'rossz',
            status: 'new',
        },    
        {
            id: 2,
            date: '2012.12.12',
            location: 'pc2',
            description: 'rossz',
            status: 'assigned',
        },    
        {
            id: 3,
            date: '2015.12.12',
            location: 'pc9',
            description: 'rossz',
            status: 'success',
        },    
    ]
});

export default ErrorModel;
