var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  _ = require('lodash'),
  timestamps = require('mongoose-timestamp'),
  Definitions = require('../model-definitions');


var ProjectSchema = new Schema({
  assignee: Definitions.string(100, true),
  criteria: Definitions.string(100, false),
  description: Definitions.string(100, false),
  reporter: Definitions.string(100, true),
  status: Definitions.string(100, true),
  title: Definitions.string(100, true),
  type: Definitions.string(100, true),
  userId: Definitions.string(100, true)
});

ProjectSchema.virtual('id').get(function() {
  return this._id;
});

ProjectSchema.set('toJSON', {
  virtuals: true
});

ProjectSchema.plugin(timestamps);
module.exports = mongoose.model('Project', ProjectSchema);
