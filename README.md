Welcome new developer to Delivery Inc!
You’ve been hired to build our delivery software, unfortunately the previous developer made a huge
mess with the code. Its your job to fix it.
The menu button is not working. Please hook it up to the drawer so we can see the list of pages
At the moment all the code is in one file. Please separate the pages into separate files and see if you can
break down the components
There need to be 3 pages
1. Customer list
2. Package list
3. Invoices
Please use react-router to navigate between the pages

The customer page
This page contains the list of customers. We need to be able to delete customers but you don’t have to
add any. When you click on create invoice button it take you to another page which will display the
invoice dynamically based off of what is in the package list. See invoice example
The package list
This page contains a list of packages. It should be sorted by shippingOrder. Using a modal it should be
possible to add new packages. See the Plus icon at the top of the table. It should be possible to reorder
the shipping order using up and down buttons on each row.
The invoice list
The invoice list needs to be dynamically generated from packages and the customers and doesn’t have
any controls

Make sure to notice other bugs and other odd behaviors. Can you create a custom hook? Make sure to
do that!