module.exports = {
  title: 'OfficialBio',
  menu: 'Menu',
  settings: {
    publicProfile: 'Profile page',
    posts: 'Musings page',
    settings: 'Settings',
    signIn: 'Sign in',
    signOut: 'Sign out',
    userTooltip: 'Visit your public page',
  },
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
    info: 'This post viewable to the public',
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
      image: '/hero-images/woman-dog-selfie.png',
    },
    {
      id: 2,
      name: 'Keep Followers Updated',
      summary:
        'By publishing a musing, you get to stay in control of what select posts appear on your page. No more having to update links!',
      image: '/hero-images/social.png',
    },
    {
      id: 3,
      name: 'Showcase Your Best',
      summary: 'By highlighting a post, you get to show off what you do best.',
      image: '/hero-images/likes.png',
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
    shareTitle: `You've copied this user's page!`,
    shareDescription:
      'Feel free to share it by pasting the link wherever you want.',
    shareError: 'Oops! Something went wrong. Please try again.',
    shareButton: 'Okay',
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
    name: 'Display Name',
    nameAria: 'Set your display name',
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
