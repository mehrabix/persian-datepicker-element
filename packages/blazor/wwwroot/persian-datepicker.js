window.initializePersianDatePicker = function (element) {
    // Import the web component
    import('https://unpkg.com/persian-datepicker-element@1.0.35/dist/persian-datepicker-element.min.js')
        .then(() => {
            // The web component is now registered and ready to use
            console.log('Persian Date Picker web component initialized');
        })
        .catch(error => {
            console.error('Error initializing Persian Date Picker:', error);
        });
}; 