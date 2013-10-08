package haflow.engine;

import haflow.dto.entity.Flow;

public abstract class AbstractEngine {
	public abstract ValidateFlowResult validateFlow(Flow flow);

	public abstract RunFlowResult runFlow(Flow flow);
}
