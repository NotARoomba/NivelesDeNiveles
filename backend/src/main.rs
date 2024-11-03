#[macro_use] extern crate rocket;
use std::env;

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[launch]
fn rocket() -> _ {
    match env::var("PORT") {
        Ok(port) => rocket::build()
        .configure(rocket::Config::figment().merge(("port", port.parse::<u16>().unwrap())))
        .mount("/", routes![index]),
        Err(_) => rocket::build()
        .mount("/", routes![index]),
    }
}
