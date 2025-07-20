const Election = require('../models/Election');
const User = require('../models/User');

// Get all elections
exports.getAllElections = async (req, res) => {
  try {
    const elections = await Election.find();
    res.json(elections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new election/event
exports.createElection = async (req, res) => {
  try {
    const { name, location, date, description } = req.body;
    if (!name || !location || !date) {
      return res.status(400).json({ error: 'Name, location, and date are required.' });
    }
    const event = await Election.create({
      name,
      location,
      date,
      description,
      creator: req.user.id,
      attendees: []
    });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Register for an event
exports.registerForElection = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Election.findById(eventId);
    if (!event) return res.status(404).json({ error: 'Event not found.' });
    if (event.attendees && event.attendees.includes(req.user.id)) {
      return res.status(400).json({ error: 'Already registered.' });
    }
    event.attendees = event.attendees || [];
    event.attendees.push(req.user.id);
    await event.save();
    res.json({ message: 'Registered successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Unregister from an event
exports.unregisterFromElection = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Election.findById(eventId);
    if (!event) return res.status(404).json({ error: 'Event not found.' });
    event.attendees = (event.attendees || []).filter(uid => uid !== req.user.id);
    await event.save();
    res.json({ message: 'Unregistered successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get events near a location
exports.getNearbyElections = async (req, res) => {
  try {
    const { lng, lat, maxDistance } = req.query;
    if (!lng || !lat) {
      return res.status(400).json({ error: 'lng and lat are required.' });
    }
    const events = await Election.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseInt(maxDistance) || 10000 // 10km default
        }
      }
    });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 