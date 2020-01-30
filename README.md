# GeoFetch

Geolocation To-Do App

# User Stories

## User Story - Signup/Login

- As a user, I can create an account.
- I can input basic info for signup, or signup with Facebook or Google Account.

## User Story - Profile (Stretch)

- As a user, I can add Profile info, edit info, or link from Facebook or Google account.

## User Story - List View - All

- With any amount of todo lists, I can search a local map for the locations associated with all (or filtered return) of the todo lists.
- With several todo lists, I can sort them by geolocation, date due, or (last updated list - default), and filter by categories and (stretch - collaborator).
- Create list.
- The list headers shows the distance from the list to my home location, or (if permitted) from the list to my current location.

## User Story - List View - Detail

- With the todo list, I can see & edit; list title, list of items, geolocation, date due, category, (Stretch goal - collaborator).
- Geolocation of list in a thumbnail near the title of the list.
- On list detail view, as a user, I will be able to update all list data.

## User Story - List View - Create

- With your account, you can create a todo list.
- With the todo list, you can assign; list title, list of items, geolocation, date due, category, (Stretch goal - collaborator).

## User Story - Map View - All

- With geolocations assigned to lists, you can view a local map with all of your todo list locations.
- Select location on map, and view associated todo list as a popup.
- (Stretch Goal - Always on geolocation verification, todo list would popup if nearby).

# ERD

![Image of ERD](https://i.imgur.com/Jim3GOH.png)

# Milestones

## Shelly

- Sign up
  - encrypting password
  - Social Sign up (google), search for google ID
  - phone number or email confirmation(6 digit code)
- Log in
  - Basic Email Password Auth
  - Session connect or **Stretch: JWT(JSON Web Token)**
- To-Do list All
  - fetch all data and show on page
  - sorting
  - **Searching**
- To-Do Detail Page
  - Edit function(update)
- To-Do Create Page
  - creat new to-do and update database

## Jason

- Sign up
  - Social Sign up (Facebook)
- Map
  - Populate location pin on map
  - Show detail view when user clicks the pin
  - Google autocomplete and search terms
    - https://developers.google.com/maps/documentation/javascript/places-autocomplete
  - Grouping markers with same location on Map.
  - Create map markers with same location on Map.
  - Get badge on markers to show number of tasks in list.
  - Show all current tasks with geolocations on Map.
- Todo List - All
  - Show distance from task list to home or **Stretch: current location**.

# MVP

- User signs up for account, and can create or signin with social signin; facebook/google.
- Show lists of tasks, that can be created, edited, updated, marked as complete, and sorted.
- Assign predefined categories to task list, with corresponding category color.
- Assign & update geolocation to individual task list.
- View map with home location, and tasks markers that have a geolocation, colored by category, and have a badge with number of tasks in the list.
- Mobile-first design for layout and interaction.

# Stretch Goals

- Categories UI Elements for filtering task lists by category
- Autocomplete on Google Map Search
- User can access profile page with account info.
- Assign emoji to task list categories.
- Stretch: JWT(JSON Web Token)
- Searching for tasks
- Phone number and email confirmation.
