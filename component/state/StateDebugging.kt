package com.material.statedebugging

import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

/**
 * StateDebugging - Advanced Compose Component
 * Generated for: feat: add component state management

- Implement reactive state system
- Create state synchronization
- Add state persistence layer
- Set up state debugging tools
 * Created: 2026-01-19 13:06:34
 */

data class StateDebuggingState(
    val isLoading: Boolean = false,
    val isEnabled: Boolean = true,
    val data: Any? = null,
    val error: String? = null
)

data class StateDebuggingConfig(
    val enabled: Boolean = true,
    val variant: String = "primary",
    val features: List<String> = emptyList(),
    val options: Map<String, Any> = emptyMap()
)

class StateDebuggingViewModel {
    private val _state = MutableStateFlow(StateDebuggingState())
    val state: StateFlow<StateDebuggingState> = _state.asStateFlow()
    
    private val _config = MutableStateFlow(StateDebuggingConfig())
    val config: StateFlow<StateDebuggingConfig> = _config.asStateFlow()
    
    fun updateState(newState: StateDebuggingState) {
        _state.value = newState
    }
    
    fun updateConfig(newConfig: StateDebuggingConfig) {
        _config.value = newConfig
    }
    
    suspend fun performAction(action: String, params: Map<String, Any> = emptyMap()) {
        _state.value = _state.value.copy(isLoading = true, error = null)
        
        try {
            // Simulate async operation
            kotlinx.coroutines.delay(100)
            
            val result = when (action) {
                "initialize" -> handleInitialize(params)
                "execute" -> handleExecute(params)
                "update" -> handleUpdate(params)
                else -> throw IllegalArgumentException("Unknown action: ")
            }
            
            _state.value = _state.value.copy(
                isLoading = false,
                data = result
            )
        } catch (e: Exception) {
            _state.value = _state.value.copy(
                isLoading = false,
                error = e.message
            )
        }
    }
    
    private fun handleInitialize(params: Map<String, Any>): Any {
        return mapOf(
            "initialized" to true,
            "timestamp" to System.currentTimeMillis(),
            "params" to params
        )
    }
    
    private fun handleExecute(params: Map<String, Any>): Any {
        return mapOf(
            "executed" to true,
            "result" to "Success",
            "params" to params
        )
    }
    
    private fun handleUpdate(params: Map<String, Any>): Any {
        return mapOf(
            "updated" to true,
            "changes" to params
        )
    }
}

@Composable
fun StateDebugging(
    modifier: Modifier = Modifier,
    viewModel: StateDebuggingViewModel = remember { StateDebuggingViewModel() },
    onAction: ((String, Map<String, Any>) -> Unit)? = null
) {
    val state by viewModel.state.collectAsState()
    val config by viewModel.config.collectAsState()
    
    LaunchedEffect(Unit) {
        viewModel.performAction("initialize")
    }
    
    Column(
        modifier = modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        if (config.enabled) {
            Text(
                text = "StateDebugging Component",
                style = MaterialTheme.typography.headlineSmall
            )
            
            when {
                state.isLoading -> {
                    CircularProgressIndicator()
                }
                state.error != null -> {
                    Text(
                        text = "Error: ",
                        color = MaterialTheme.colorScheme.error
                    )
                }
                else -> {
                    Text(
                        text = "Status: Ready",
                        color = MaterialTheme.colorScheme.primary
                    )
                    
                    if (state.data != null) {
                        Text(
                            text = "Data: ",
                            style = MaterialTheme.typography.bodyMedium
                        )
                    }
                }
            }
            
            Row(
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Button(
                    onClick = {
                        onAction?.invoke("execute", emptyMap())
                    }
                ) {
                    Text("Execute")
                }
                
                OutlinedButton(
                    onClick = {
                        onAction?.invoke("update", mapOf("timestamp" to System.currentTimeMillis()))
                    }
                ) {
                    Text("Update")
                }
            }
        }
    }
}

@Composable
fun StateDebuggingPreview() {
    MaterialTheme {
        StateDebugging()
    }
}
