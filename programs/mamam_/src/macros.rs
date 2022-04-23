// Useful macro rules

#[macro_export]
macro_rules! u_to_f_repr {
    ($n: expr) => {
        (($n as f64) / (10_u32.pow(6)) as f64)
    };
}

#[macro_export]
macro_rules! f_to_u_repr {
    ($n: expr) => {
        (($n * (10_u32.pow(6)) as f64) as u64)
    };
}

#[macro_export]
macro_rules! i_to_f_repr {
    ($n: expr) => {
        (($n as f64) / (10_u32.pow(6)) as f64)
    };
}

#[macro_export]
macro_rules! f_to_i_repr {
    ($n: expr) => {
        (($n * (10_u32.pow(6)) as f64) as i64)
    };
}

#[macro_export]
macro_rules! floor {
    ($n: expr) => {
        ($n - ($n % 1f64)) as u64
    };
}

#[macro_export]
macro_rules! ceil {
    ($n: expr) => {
        ($n - ($n % 1f64) + 1f64) as u64
    };
}
