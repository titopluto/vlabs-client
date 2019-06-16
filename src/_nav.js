export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-wrench',
      badge: {
        variant: 'success',
        text: 'main'
      }
    },

    {
      name: 'Monitorboard',
      url: '/monitorboard',
      icon: 'icon-note',
      visible: 'staff',
    },

    {
      divider:true            // optional class names space delimited list for title item ex: "text-center"
    },

    {
      title: true,
      name: '',
      wrapper: {            // optional wrapper object
        element: 'span',      // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },

    {
      name: 'My Courses',
      url: '/courses',
      icon: 'icon-puzzle'
    },
    {
      name: 'Self Service',
      url: '/selfservice',
      icon: 'icon-folder-alt',
    },

     {
      name: 'Admin Tools',
      url: '/admin-tools',
      icon: 'icon-briefcase',
      visible: 'staff',
    },

    // {
    //   name: 'Labs',
    //   url: '/vlabs',
    //   icon: 'icon-vector',
    //   children: [
    //     {
    //       name: 'All Labs',
    //       url: '/vlabs/labs',
    //       icon: 'icon-puzzle'
    //     },
    //
    //   ]
    // },
  ]
};



