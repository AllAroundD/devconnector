const express = require('express')
// const request = require('request')
const axios = require('axios');
const config = require('config')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require('normalize-url');

const Profile = require('../../models/Profile')
const User = require('../../models/User')
const Post = require('../../models/Post')

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile
            .findOne({ user: req.user.id })
                .populate('user', ['name', 'avatar'])
        
        if(!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' })
        }

        // only populate from user document if profile exists
        res.json(profile.populate('user', ['name', 'avatar']));
    } catch(err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// @route   POST api/profile/
// @desc    Create or update user profile
// @access  Private
router.post(
    '/',
    auth,
    check('status', 'Status is required').notEmpty(),
    check('skills', 'Skills is required').notEmpty(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      // destructure the request
      const {
        website,
        skills,
        youtube,
        twitter,
        instagram,
        linkedin,
        facebook,
        // spread the rest of the fields we don't need to check
        ...rest
      } = req.body;
  
      // build a profile
      const profileFields = {
        user: req.user.id,
        website:
          website && website !== ''
            ? normalize(website, { forceHttps: true })
            : '',
        skills: Array.isArray(skills)
          ? skills
          : skills.split(',').map((skill) => ' ' + skill.trim()),
        ...rest
      };
  
      // Build socialFields object
      const socialFields = { youtube, twitter, instagram, linkedin, facebook };
  
      // normalize social fields to ensure valid url
      for (const [key, value] of Object.entries(socialFields)) {
        if (value && value.length > 0)
          socialFields[key] = normalize(value, { forceHttps: true });
      }
      // add to profileFields
      profileFields.social = socialFields;
  
      try {
        // Using upsert option (creates new doc if no match is found):
        let profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        return res.json(profile);
      } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
      }
    }
  );

// @route   GET api/profile/
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        res.json(profiles)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
        
    }
})

// @route   GET api/profile/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar'])
        if (!profile) {
            return res.status(400).json({ msg: 'Profile not found' })
        }
        
        res.json(profile)
    } catch (err) {
        console.error(err.message)
        if(err.kind == 'ObjectId') {
            console.error('Profile not found')
            return res.status(400).json({ msg: 'Profile not found' })
        }
        res.status(500).send('Server Error')
        
    }
})

// @route   DELETE api/profile/
// @desc    Delete profile, user & posts
// @access  Private
router.delete('/', auth, async (req, res) => {
    try {
        // Remove user posts
        await Post.deleteMany({ user: req.user.id })

        // remove profile
        await Profile.findOneAndRemove({ user: req.user.id })
        // remove user
        await User.findOneAndRemove({ _id: req.user.id })
        
        res.json({ msg: 'User deleted' })
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
        
    }
})

// @route       PUT api/profile/experience
// @desc        Add profile experience
// @access      Private
router.put('/experience', [auth, [
    check('title', 'Title is required')
        .not()
        .isEmpty(),
    check('company', 'Company is required')
        .not()
        .isEmpty(),
    check('from', 'From date is required')
        .not()
        .isEmpty()
]
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: error.array() })
    }
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }
    try {
        const profile = await Profile.findOne({ user: req.user.id })
        // unshift pushes to the beginning of the array as oppose to
        // push which pushes to the end
        profile.experience.unshift(newExp)
        await profile.save()
        res.json(profile)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

// @route       DELETE api/profile/experience/:exp_id
// @desc        Delete experience from profile
// @access      Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })

        // Get remove index
        const removeIndex = profile.experience.map(item => item.id).indexOf
            (req.params.exp_id)

        profile.experience.splice(removeIndex, 1)

        await profile.save()

        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put('/education', [auth, [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field of study is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
] ], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id })

        profile.education.unshift(newEdu)   // push to beginning

        await profile.save()

        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })

        // Get remove index
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id)

        profile.education.splice(removeIndex, 1)

        await profile.save()

        res.json(profile)
    } catch (error) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// @route   GET api/profile/github/:username
// @desc    Get user repos from Github
// @access  Public
router.get('/github/:username', async (req, res) => {
    // try {
    //     // const options = {
    //     //     uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
    //     //     method: 'GET',
    //     //     headers: { 'user-agent': 'node.js' }
    //     // }

    //     // console.log('Enter router GitHub ');
    //     const options = {
    //         uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
    //         method: 'GET',
    //         headers: { 'user-agent': 'node.js' }
    //     };

    //     request(options, (error, response, body) => {
    //         if(error) console.error(error)

    //         if(response.statusCode != 200) {
    //             return res.status(404).json({ msg: 'No Github profile found'})
    //         }

    //         res.json(JSON.parse(body))
    //     })
    // } catch (err) {
    //     console.error(err.message)
    //     res.status(500).send('Server Error')
    // }

    try {
        const uri = encodeURI(
          `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
        );
        // const headers = {
        //   'user-agent': 'node.js',
        //   Authorization: `token ${config.get('githubToken')}`
        // };
    
        // const gitHubResponse = await axios.get(uri, { headers });
        const gitHubResponse = await axios.get(uri);
        return res.json(gitHubResponse.data);
      } catch (err) {
        console.error(err.message);
        return res.status(404).json({ msg: 'No Github profile found' });
      }
})



module.exports = router