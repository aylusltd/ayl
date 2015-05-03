function Job(title, location, description){
    var props = typeof title == 'object' ? title : {title : title};
    
    props.location = props.location || location;
    props.description = props.description || description;
    
    return props;
}

function newJob(title, location, description){
    var job = new Job(title, location, description);
}

var jobs = [];

module.exports = {
    available : jobs,
    add: newJob
}