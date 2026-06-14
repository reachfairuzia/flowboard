namespace flowboard.api.Helper
{
    public class ResponseHelper<T>
    {
        public int StatusCode { get; set; }
        public string Message { get; set; } = "";
        public T? Data { get; set; }
    }

    public static class Response
    {
        public static ResponseHelper<T> Ok<T>(T data,  string message = "Success") => new() { Data = data, Message = message, StatusCode = 200};
        public static ResponseHelper<T> BadRequest<T>(string message) => new() {Message = message, StatusCode = 400};
        public static ResponseHelper<T> NotFound<T>(string message = "Data Not Found") => new() {Message = message, StatusCode = 404};
        public static ResponseHelper<T> Error<T>(string message = "Internal Server Error") => new() {Message = message, StatusCode = 500};
    }
}
