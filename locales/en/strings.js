module.exports = {
  title: 'OfficialBio',
  menu: 'Menu',
  // General delete actions
  delete: {
    button: 'Delete',
    prompt: 'Are you sure you want to delete this post?',
    description:
      'Once you delete this post, there is no retrieving it, the post is gone for good',
    confirm: 'Yes, delete it',
    deny: 'No, keep it',
  },
  publish: {
    button: 'Publish this post',
    prompt: 'Are you sure you want to publish this post?',
    description:
      'Once you publish this post, others will be able to view it on your public page',
    confirm: 'Yes, publish it',
    deny: 'No, do not publish',
  },
  private: {
    button: 'Privatize this post',
    prompt: 'Are you sure you want to make this post private?',
    description: 'Making this post private will hide it from your public page',
    confirm: 'Yes, make it private',
    deny: 'No, keep it public',
  },
  // Landing page
  // Prompt is the button text for the user to get to the sign in page
  landing: {
    title: 'Your corner of the web',
    subtitle: 'Create the perfect profile to showcase the real you',
    prompt: "Let's get started",
  },
  // List of features displayed on the landing page
  features: [
    {
      id: 1,
      name: 'Build your identity',
      summary:
        'Link all of your important accounts in one place, all without any of your important data leaving the original services.',
      image: '/10.png',
    },
    {
      id: 2,
      name: 'Keep Followers Updated',
      summary:
        'By publishing a musing, you get to stay in control of what select posts appear on your page. No more having to update links!',
      image: '/06.png',
    },
    {
      id: 3,
      name: 'Showcase Your Best',
      summary: 'By highlighting a post, you get to show off what you do best.',
      image: '/01.png',
    },
  ],
  // Musings page
  musings: {
    create: 'Create a new post',
    submit: 'Submit Post',
    publish: 'Publish Post',
    delete: 'Delete Post',
    addImages: 'Add Images',
    maxFiles: "You can't upload more than 4 files",
  },
  // User public page
  public: {
    share: 'Share Page',
    sharedMessage: 'Copied! ❤️',
    shareError: 'Oops! Something went wrong. Please try again.',
    missingUser: 'No public posts from that user 😞',
    returnHome: 'Return back home',
  },
  // Sign in page
  sign: {
    header: 'Sign In',
    explanation:
      'Enter your email to receive your Magic Link to log in seamlessly',
    alternative: 'Or sign in through one of the providers listed below',
  },
  // Profile page
  account: {
    avatar: 'Avatar Image',
    avatarDesc: 'Change your public facing display image',
    avatarUpload: 'Add your profile image',
    avatarReplace: 'Replace your profile image',
    avatarInProgress: 'Replacing...',
    info: 'Profile Information',
    infoDesc:
      'Your email cannot be changed without making a new account, and it will never be shown to anyone else',
    links: 'Public Links',
    linksDesc: 'Customize which links show up on your public profile',
    linksAlt: 'Basic information',
    connected: 'Connected Accounts',
    save: 'Save Changes',
    loading: 'Loading...',
    signOut: 'Sign Out',
  },
  // Connected account section
  connected: {
    // Prompt1 and Prompt2 are sandwiched between the user's name
    // So the full prompt is: "Display {namehere} on your profile?"
    prompt1: 'Display',
    prompt2: 'on your profile?',
  },
};
