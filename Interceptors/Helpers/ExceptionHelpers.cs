namespace CountryService.gRPC.Interceptors.Helpers;

public static class ExceptionHelpers
{
    public static RpcException Handle<T>(this Exception exception, ServerCallContext context, ILogger<T> logger, Guid correlationId) =>
        exception switch
        {
            TimeoutException => HandleTimeoutException((TimeoutException)exception, context, logger, correlationId),
            SqlException => HandleSqlException((SqlException)exception, context, logger, correlationId),
            RpcException => HandleRpcException((RpcException)exception, logger, correlationId),
            _ => HandleDefault(exception, context, logger, correlationId)
        };

    private static RpcException HandleTimeoutException<T>(TimeoutException exception, ServerCallContext context, ILogger<T> logger, Guid correlationId)
    {
        logger.LogError(exception, $"CorrelationId: {correlationId} - A timeout occurred");
        Status status;

        status = new Status(StatusCode.Internal, "An external resource did not answer within the time limit");

        return new RpcException(status, CreateTrailers(correlationId));
    }

    private static RpcException HandleSqlException<T>(SqlException exception, ServerCallContext context, ILogger<T> logger, Guid correlationId)
    {
        logger.LogError(exception, $"CorrelationId: {correlationId} - An SQL error occurred");
        Status status;

        if (exception.Number == -2)
        {
            status = new Status(StatusCode.DeadlineExceeded, "SQL timeout");
        }
        else
        {
            status = new Status(StatusCode.Internal, "SQL error");
        }
        return new RpcException(status, CreateTrailers(correlationId));
    }

    private static RpcException HandleRpcException<T>(RpcException exception, ILogger<T> logger, Guid correlationId)
    {
        logger.LogError(exception, $"CorrelationId: {correlationId} - An error occurred");
        var trailers = exception.Trailers;
        trailers.Add(CreateTrailers(correlationId)[0]);
        return new RpcException(new Status(exception.StatusCode, exception.Message), trailers);
    }

    private static RpcException HandleDefault<T>(Exception exception, ServerCallContext context, ILogger<T> logger, Guid correlationId)
    {
        logger.LogError(exception, $"CorrelationId: {correlationId} - An error occurred");
        return new RpcException(new Status(StatusCode.Internal, exception.Message), CreateTrailers(correlationId));
    }

    /// <summary>
    ///  Adding the correlation to Response Trailers
    /// </summary>
    /// <param name="correlationId"></param>
    /// <returns></returns>
    private static Metadata CreateTrailers(Guid correlationId)
    {
        var trailers = new Metadata();
        trailers.Add("CorrelationId", correlationId.ToString());
        return trailers;
    }
}